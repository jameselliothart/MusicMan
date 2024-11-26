using MusicDataService.Songs;
using MusicDataService.Persistence;
using MusicDataService.Songs.Commands;
using MusicDataService.Utils;

namespace MusicDataService.CommandHandlers;

public class SqlCommandHandler(IMusicManRepository repo) : ICommandHandler
{
    public async Task<Result<int>> Handle(ICommand command)
    {
        var affectedCount = command switch
        {
            AddSongCommand c => await Add(c),
            UpdateSongCommand c => await Update(c),
            DeleteSongCommand c => await Delete(c),
            _ => throw new ArgumentOutOfRangeException(nameof(command), $"Unexpected command value: {command}"),
        };
        return affectedCount;
    }

    private async Task<Result<int>> Add(AddSongCommand command)
    {
        var song = new Song(command.Id, command.Name, command.Artist, command.Album);
        var addResult = await repo.Add(song);
        return addResult;
    }

    private async Task<Result<int>> Update(UpdateSongCommand command)
    {
        var updatedSong = new Song(command.Id, command.Name, command.Artist, command.Album);
        var updatedCount = await repo.Update(updatedSong);
        var updateResult = updatedCount == 0 ? Result.Failure<int>(Error.NotFound()) : Result.Success(updatedCount);
        return updateResult;
    }

    private async Task<Result<int>> Delete(DeleteSongCommand command)
    {
        var removedCount = await repo.Delete(command.Id);
        var removeResult = removedCount == 0 ? Result.Failure<int>(Error.NotFound()) : Result.Success(removedCount);
        return removeResult;
    }

}
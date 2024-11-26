using MusicDataService.Persistence;
using MusicDataService.Utils;

namespace MusicDataService.Songs.Commands;

public class SqlCommandHandler(IMusicManRepository repo) : ICommandHandler
{
    public async Task<Result<int>> Handle(AddSongCommand command)
    {
        var song = new Song(command.Id, command.Name, command.Artist, command.Album);
        var addResult = await repo.Add(song);
        return addResult;
    }

    public async Task<Result<int>> Handle(UpdateSongCommand command)
    {
        var updatedSong = new Song(command.Id, command.Name, command.Artist, command.Album);
        var updatedCount = await repo.Update(updatedSong);
        var updateResult = updatedCount == 0 ? Result.Failure<int>(Error.NotFound()) : Result.Success(updatedCount);
        return updateResult;
    }

    public async Task<Result<int>> Handle(DeleteSongCommand command)
    {
        var removedCount = await repo.Delete(command.Id);
        var removeResult = removedCount == 0 ? Result.Failure<int>(Error.NotFound()) : Result.Success(removedCount);
        return removeResult;
    }

}
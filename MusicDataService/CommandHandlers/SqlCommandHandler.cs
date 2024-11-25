using Microsoft.EntityFrameworkCore;
using MusicDataService.Songs;
using MusicDataService.Persistence;
using MusicDataService.Songs.Commands;

namespace MusicDataService.CommandHandlers;

public class SqlCommandHandler(IMusicManRepository repo) : ICommandHandler
{
    public async Task<int> Handle(ICommand command)
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

    private async Task<int> Add(AddSongCommand command)
    {
        var song = new Song(command.Id, command.Name, command.Artist, command.Album);
        var addedCount = await repo.Add(song);
        return addedCount;
    }

    private async Task<int> Update(UpdateSongCommand command)
    {
        var updatedSong = new Song(command.Id, command.Name, command.Artist, command.Album);
        var updatedCount = await repo.Update(updatedSong);
        return updatedCount;
    }

    private async Task<int> Delete(DeleteSongCommand command)
    {
        var removedCount = await repo.Delete(command.Id);
        return removedCount;
    }

}
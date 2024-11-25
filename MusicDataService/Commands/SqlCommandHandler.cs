using Microsoft.EntityFrameworkCore;
using MusicDataService.Songs;
using MusicDataService.Persistence;
using MusicDataService.Songs.Commands;

namespace MusicDataService.Commands;

public class SqlCommandHandler(MusicManContext context) : ICommandHandler, IDisposable
{
    private readonly MusicManContext _context = context;

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
        var alreadyExists = await _context.Songs.Where(s => s.Id == command.Id).FirstOrDefaultAsync();
        if (alreadyExists != null)
        {
            return 0;
        }
        var song = new Song(command.Id, command.Name, command.Artist, command.Album);
        _context.Songs.Add(song);
        var addedCount = await SaveChangesAsync();
        return addedCount;
    }

    private async Task<int> Update(UpdateSongCommand command)
    {
        var updatedSong = new Song(command.Id, command.Name, command.Artist, command.Album);
        var updatedCount = await _context.Songs
            .Where(s => s.Id == updatedSong.Id)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(s => s.Artist, updatedSong.Artist)
                .SetProperty(s => s.Album, updatedSong.Album)
                .SetProperty(s => s.Name, updatedSong.Name)
            );
        return updatedCount;
    }

    private async Task<int> Delete(DeleteSongCommand command)
    {
        var removedCount = await _context.Songs.Where(s => s.Id == command.Id).ExecuteDeleteAsync();
        return removedCount;
    }

    private async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context?.Dispose();
        GC.SuppressFinalize(this);
    }
}
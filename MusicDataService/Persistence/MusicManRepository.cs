using Microsoft.EntityFrameworkCore;
using MusicDataService.Songs;
using MusicDataService.Utils;

namespace MusicDataService.Persistence;

public class MusicManRepository(MusicManContext context) : IMusicManRepository
{
    public async Task<IEnumerable<Song>> GetAll() => await context.Songs.ToListAsync();

    public async Task<Song?> GetById(Guid id)
        => await context.Songs.Where(s => s.Id == id).FirstOrDefaultAsync();

    public async Task<Result<int>> Add(Song song)
    {
        var existingCount = await context.Songs.Where(s => s.Id == song.Id).CountAsync();
        if (existingCount > 0)
        {
            return Result.Failure<int>(Error.Duplicate());
        }
        context.Songs.Add(song);
        var addedCount = await context.SaveChangesAsync();
        return Result.Success(addedCount);
    }

    public async Task<int> Update(Song updatedSong)
    {
        var updatedCount = await context.Songs
            .Where(s => s.Id == updatedSong.Id)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(s => s.Artist, updatedSong.Artist)
                .SetProperty(s => s.Album, updatedSong.Album)
                .SetProperty(s => s.Name, updatedSong.Name)
            );
        return updatedCount;
    }

    public async Task<int> Delete(Guid id)
    {
        var removedCount = await context.Songs.Where(s => s.Id == id).ExecuteDeleteAsync();
        return removedCount;
    }
}

using MusicDataService.Songs;
using MusicDataService.Utils;

namespace MusicDataService.Persistence;

public interface IMusicManRepository
{
    public Task<IEnumerable<Song>> GetAll();

    public Task<Song?> GetById(Guid id);

    public Task<Result<int>> Add(Song song);

    public Task<int> Update(Song updatedSong);

    public Task<int> Delete(Guid id);
}
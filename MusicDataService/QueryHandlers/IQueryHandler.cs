using MusicDataService.Songs;
using MusicDataService.Songs.Queries;

namespace MusicDataService.QueryHandlers;

public interface IQueryHandler
{
    public Task<IEnumerable<Song>> Handle(QueryAll query);
    public Task<Song?> Handle(QueryOne query);
}
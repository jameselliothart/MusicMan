using MusicDataService.Songs;
using MusicDataService.Persistence;
using MusicDataService.Songs.Queries;

namespace MusicDataService.QueryHandlers;

public class SqlQueryHandler(IMusicManRepository repo) : IQueryHandler
{
    public async Task<IEnumerable<Song>> Handle(QueryAll _) => await repo.GetAll();

    public async Task<Song?> Handle(QueryOne query) => await repo.GetById(query.Id);
}

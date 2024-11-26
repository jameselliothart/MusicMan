using MusicDataService.Persistence;

namespace MusicDataService.Songs.Queries;

public class SqlQueryHandler(IMusicManRepository repo) : IQueryHandler
{
    public async Task<IEnumerable<Song>> Handle(QueryAll _) => await repo.GetAll();

    public async Task<Song?> Handle(QueryOne query) => await repo.GetById(query.Id);
}

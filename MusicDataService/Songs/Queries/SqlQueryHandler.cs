using MusicDataService.Persistence;

namespace MusicDataService.Songs.Queries;

public class SqlQueryHandler(IMusicManRepository repo) : IQueryHandler
{
    public async Task<IEnumerable<Song>> HandleAsync(QueryAll _) => await repo.GetAll();

    public async Task<Song?> HandleAsync(QueryOne query) => await repo.GetById(query.Id);
}

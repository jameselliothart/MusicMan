namespace MusicDataService.Songs.Queries;

public interface IQueryHandler
{
    public Task<IEnumerable<Song>> HandleAsync(QueryAll query);
    public Task<Song?> HandleAsync(QueryOne query);
}
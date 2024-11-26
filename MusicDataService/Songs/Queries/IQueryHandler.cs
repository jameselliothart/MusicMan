namespace MusicDataService.Songs.Queries;

public interface IQueryHandler
{
    public Task<IEnumerable<Song>> Handle(QueryAll query);
    public Task<Song?> Handle(QueryOne query);
}
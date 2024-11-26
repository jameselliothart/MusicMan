namespace MusicDataService.Songs.Queries;

public class InMemoryQueryHandler(List<Song> songs) : IQueryHandler
{
    private readonly List<Song> _songs = songs;

    public async Task<IEnumerable<Song>> HandleAsync(QueryAll _) => await Task.FromResult(_songs);

    public async Task<Song?> HandleAsync(QueryOne query) => await Task.FromResult(_songs.Find(q => q.Id == query.Id));
}

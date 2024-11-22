using MusicDataService.Domain;

namespace MusicDataService.Queries;

public class InMemoryQueryHandler(List<Song> songs) : IQueryHandler
{
    private readonly List<Song> _songs = songs;

    public Task<IEnumerable<Song>> Handle(IQuery query)
    {
        var result = query switch
        {
            QueryAll => Get(),
            QuerySpecific q => Get(q),
            _ => throw new ArgumentOutOfRangeException(nameof(query), $"Unexpected query value: {query}"),
        };
        return Task.FromResult(result);
    }

    private IEnumerable<Song> Get() => _songs;

    private IEnumerable<Song> Get(QuerySpecific query) => _songs.FindAll(q => q.Id == query.Id);
}

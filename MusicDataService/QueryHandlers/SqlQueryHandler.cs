using MusicDataService.Songs;
using MusicDataService.Persistence;
using MusicDataService.Songs.Queries;

namespace MusicDataService.QueryHandlers;

public class SqlQueryHandler(IMusicManRepository repo) : IQueryHandler
{
    public async Task<IEnumerable<Song>> Handle(IQuery query)
    {
        var songs = query switch
        {
            QueryAll => await Get(),
            QuerySpecific q => await Get(q),
            _ => throw new ArgumentOutOfRangeException(nameof(query), $"Unexpected query value: {query}"),
        };
        return songs;
    }

    private async Task<IEnumerable<Song>> Get() => await repo.GetAll();

    // TODO fix this to return single song. Need two Handles: HandleMultiple, HandleSingle
    private async Task<IEnumerable<Song>> Get(QuerySpecific query)
    {
        var song = await repo.GetById(query.Id);
        if (song == null)
            return [];
        return [song];
    }
}

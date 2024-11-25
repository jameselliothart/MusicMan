using Microsoft.EntityFrameworkCore;
using MusicDataService.Domain;
using MusicDataService.Persistence;

namespace MusicDataService.Queries;

public class SqlQueryHandler(MusicManContext context) : IQueryHandler, IDisposable
{
    private readonly MusicManContext _context = context;

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

    private async Task<IEnumerable<Song>> Get() => await _context.Songs.ToListAsync();

    // TODO fix this to return single song. Need two Handles: HandleMultiple, HandleSingle
    private async Task<IEnumerable<Song>> Get(QuerySpecific query)
        => await _context.Songs.Where(s => s.Id == query.Id).ToListAsync();

    public void Dispose()
    {
        _context?.Dispose();
        GC.SuppressFinalize(this);
    }
}

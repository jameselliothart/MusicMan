using MusicDataService.Songs;
using MusicDataService.Songs.Queries;

namespace MusicDataService.QueryHandlers;

public interface IQueryHandler
{
    Task<IEnumerable<Song>> Handle(IQuery query);
}
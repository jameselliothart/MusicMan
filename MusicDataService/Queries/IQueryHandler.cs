using MusicDataService.Songs;
using MusicDataService.Songs.Queries;

namespace MusicDataService.Queries;

public interface IQueryHandler
{
    Task<IEnumerable<Song>> Handle(IQuery query);
}
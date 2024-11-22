using MusicDataService.Domain;

namespace MusicDataService.Queries;

public interface IQueryHandler
{
    Task<IEnumerable<Song>> Handle(IQuery query);
}
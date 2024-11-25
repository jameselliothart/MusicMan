namespace MusicDataService.Songs.Queries;

public interface IQuery;

public record QueryAll : IQuery;

public record QuerySpecific(Guid Id) : IQuery;
namespace MusicDataService.Commands;

public interface ICommand;

public record AddSong(Guid Id, string Name, string Artist, string Album) : ICommand;

public record UpdateSong(Guid Id, string Name, string Artist, string Album) : ICommand;

public record DeleteSong(Guid Id) : ICommand;
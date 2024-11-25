namespace MusicDataService.Songs.Commands;

public interface ICommand;

public record AddSongCommand(Guid Id, string Name, string Artist, string Album) : ICommand;

public record UpdateSongCommand(Guid Id, string Name, string Artist, string Album) : ICommand;

public record DeleteSongCommand(Guid Id) : ICommand;
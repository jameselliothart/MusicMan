namespace MusicDataService.Songs.Commands;


public record AddSongCommand(Guid Id, string Name, string Artist, string Album);

public record UpdateSongCommand(Guid Id, string Name, string Artist, string Album);

public record DeleteSongCommand(Guid Id);
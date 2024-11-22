namespace MusicDataService.Domain;

public class Song(Guid id, string name, string artist, string album)
{
    public const int MAX_NAME_LENGTH = 100;
    public const int MAX_ARTIST_LENGTH = 100;
    public const int MAX_ALBUM_LENGTH = 100;
    public Guid Id { get; } = id;
    public string Name { get; private set; } = name;
    public string Artist { get; private set; } = artist;
    public string Album { get; private set; } = album;
}

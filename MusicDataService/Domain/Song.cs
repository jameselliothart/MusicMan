namespace MusicDataService.Domain;

public class Song(Guid id, string name, string artist, string album)
{
    public Guid Id { get; } = id;
    public string Name { get; private set; } = name;
    public string Artist { get; private set; } = artist;
    public string Album { get; private set; } = album;
}

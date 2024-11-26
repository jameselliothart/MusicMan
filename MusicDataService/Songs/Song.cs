namespace MusicDataService.Songs;

public class Song(Guid id, string name, string artist, string album)
{
    public const int MAX_NAME_LENGTH = 100;
    public const int MAX_ARTIST_LENGTH = 100;
    public const int MAX_ALBUM_LENGTH = 100;
    public Guid Id { get; } = id;
    public string Name { get; private set; } = name;
    public string Artist { get; private set; } = artist;
    public string Album { get; private set; } = album;

    public override bool Equals(object? obj)
    {
        if (obj is not Song other)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        if (GetType() != other.GetType())
            return false;

        if (Id == Guid.Empty || other.Id == Guid.Empty)
            return false;

        return Id == other.Id;
    }

    public override int GetHashCode()
    {
        return Id.ToString().GetHashCode();
    }
}

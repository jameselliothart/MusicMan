using System.ComponentModel.DataAnnotations;

namespace MusicDataService.Songs.Dtos;

public record SongDto(Guid Id, string Name, string Artist, string Album);

public class AddSongDto(Guid Id, string Name, string Artist, string Album)
{
    [Required]
    public Guid Id { get; } = Id;
    [Required, MaxLength(Song.MAX_NAME_LENGTH)]
    public string Name { get; } = Name;
    [Required, MaxLength(Song.MAX_ARTIST_LENGTH)]
    public string Artist { get; } = Artist;
    [Required, MaxLength(Song.MAX_ALBUM_LENGTH)]
    public string Album { get; } = Album;
}

public class UpdateSongDto(Guid Id, string Name, string Artist, string Album)
{
    [Required]
    public Guid Id { get; } = Id;
    [Required, MaxLength(Song.MAX_NAME_LENGTH)]
    public string Name { get; } = Name;
    [Required, MaxLength(Song.MAX_ARTIST_LENGTH)]
    public string Artist { get; } = Artist;
    [Required, MaxLength(Song.MAX_ALBUM_LENGTH)]
    public string Album { get; } = Album;
}
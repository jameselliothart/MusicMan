using Microsoft.EntityFrameworkCore;
using MusicDataService.Songs;

namespace MusicDataService.Persistence;

public sealed class MusicManContext(DbContextOptions<MusicManContext> options) : DbContext(options)
{
    public required DbSet<Song> Songs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Song>(e =>
        {
            e.ToTable("songs").HasKey(song => song.Id);
            e.Property(s => s.Artist).IsRequired().HasMaxLength(Song.MAX_ARTIST_LENGTH);
            e.Property(s => s.Album).IsRequired().HasMaxLength(Song.MAX_ALBUM_LENGTH);
            e.Property(s => s.Name).IsRequired().HasMaxLength(Song.MAX_NAME_LENGTH);
        });
    }
}
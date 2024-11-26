using MusicDataService.Utils;

namespace MusicDataService.Songs.Commands;

public class InMemoryCommandHandler(List<Song> songs) : ICommandHandler
{
    private readonly List<Song> _songs = songs;

    public async Task<Result<int>> Handle(AddSongCommand command)
    {
        var song = new Song(command.Id, command.Name, command.Artist, command.Album);
        _songs.Add(song);
        return await Task.FromResult(Result.Success(1));
    }

    public async Task<Result<int>> Handle(UpdateSongCommand command)
    {
        var songToUpdate = _songs.Find(song => song.Id == command.Id);
        if (songToUpdate == null)
        {
            return await Task.FromResult(Result.Success(0));
        }
        var updatedSong = new Song(command.Id, command.Name, command.Artist, command.Album);
        _songs.Remove(songToUpdate);
        _songs.Add(updatedSong);
        return Result.Success(1);
    }

    public async Task<Result<int>> Handle(DeleteSongCommand command)
    {
        var removedCount = _songs.RemoveAll(song => song.Id == command.Id);
        return await Task.FromResult(Result.Success(removedCount));
    }
}
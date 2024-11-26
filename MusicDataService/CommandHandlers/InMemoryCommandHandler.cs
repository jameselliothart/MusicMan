using MusicDataService.Songs;
using MusicDataService.Songs.Commands;
using MusicDataService.Utils;

namespace MusicDataService.CommandHandlers;

public class InMemoryCommandHandler(List<Song> songs) : ICommandHandler
{
    private readonly List<Song> _songs = songs;

    public Task<Result<int>> Handle(ICommand command)
    {
        var result = command switch
        {
            AddSongCommand c => Add(c),
            UpdateSongCommand c => Update(c),
            DeleteSongCommand c => Delete(c),
            _ => throw new ArgumentOutOfRangeException(nameof(command), $"Unexpected command value: {command}"),
        };
        return Task.FromResult(result);
    }

    private Result<int> Add(AddSongCommand command)
    {
        var song = new Song(command.Id, command.Name, command.Artist, command.Album);
        _songs.Add(song);
        return Result.Success(1);
    }

    private Result<int> Update(UpdateSongCommand command)
    {
        var songToUpdate = _songs.Find(song => song.Id == command.Id);
        if (songToUpdate == null)
        {
            return Result.Success(0);
        }
        var updatedSong = new Song(command.Id, command.Name, command.Artist, command.Album);
        _songs.Remove(songToUpdate);
        _songs.Add(updatedSong);
        return Result.Success(1);
    }

    private Result<int> Delete(DeleteSongCommand command)
    {
        var removedCount = _songs.RemoveAll(song => song.Id == command.Id);
        return Result.Success(removedCount);
    }
}
using MusicDataService.Domain;

namespace MusicDataService.Commands;

public class InMemoryCommandHandler(List<Song> songs) : ICommandHandler
{
    private readonly List<Song> _songs = songs;

    public Task<int> Handle(ICommand command)
    {
        var result = command switch
        {
            AddSong c => Add(c),
            UpdateSong c => Update(c),
            DeleteSong c => Delete(c),
            _ => throw new ArgumentOutOfRangeException(nameof(command), $"Unexpected command value: {command}"),
        };
        return Task.FromResult(result);
    }

    private int Add(AddSong command)
    {
        var song = new Song(command.Id, command.Name, command.Artist, command.Album);
        _songs.Add(song);
        return 1;
    }

    private int Update(UpdateSong command)
    {
        var songToUpdate = _songs.Find(song => song.Id == command.Id);
        if (songToUpdate == null)
        {
            return 0;
        }
        var updatedSong = new Song(command.Id, command.Name, command.Artist, command.Album);
        _songs.Remove(songToUpdate);
        _songs.Add(updatedSong);
        return 1;
    }

    private int Delete(DeleteSong command)
    {
        var removedCount = _songs.RemoveAll(song => song.Id == command.Id);
        return removedCount;
    }
}
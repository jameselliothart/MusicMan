using Moq;
using MusicDataService.CommandHandlers;
using MusicDataService.Persistence;
using MusicDataService.Songs;
using MusicDataService.Songs.Commands;

namespace MusicDataService.Tests;

public class SqlCommandHandlerShould
{
    [Fact]
    public async Task IndicateFailureIfSongAlreadyExists()
    {
        var song = new Song(Guid.NewGuid(), "name", "artist", "album");
        var repoMock = new Mock<IMusicManRepository>();
        repoMock
            .Setup(x => x.Add(song))
            .ReturnsAsync(0)
        ;

        var handler = new SqlCommandHandler(repoMock.Object);
        var command = new AddSongCommand(song.Id, "name", "artist", "album");

        var result = await handler.Handle(command);

        Assert.Equal(0, result);
    }
}
using Moq;
using MusicDataService.Persistence;
using MusicDataService.Songs;
using MusicDataService.Songs.Commands;
using MusicDataService.Utils;

namespace MusicDataService.Tests;

public class SqlCommandHandlerShould
{
    [Fact]
    public async Task IndicateFailureIfDuplicateSongIsAdded()
    {
        var song = new Song(Guid.NewGuid(), "name", "artist", "album");
        var repoMock = new Mock<IMusicManRepository>();
        repoMock
            .Setup(x => x.Add(song))
            .ReturnsAsync(Result.Failure<int>(Error.Duplicate()))
        ;

        var handler = new SqlCommandHandler(repoMock.Object);
        var command = new AddSongCommand(song.Id, "name", "artist", "album");

        var result = await handler.HandleAsync(command);

        Assert.Equal(Error.DUPLICATE, result.Error.Code);
    }
}
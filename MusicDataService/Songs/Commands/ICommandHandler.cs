using MusicDataService.Utils;

namespace MusicDataService.Songs.Commands;

public interface ICommandHandler
{
    public Task<Result<int>> HandleAsync(AddSongCommand command);
    public Task<Result<int>> HandleAsync(UpdateSongCommand command);
    public Task<Result<int>> HandleAsync(DeleteSongCommand command);
}
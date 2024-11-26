using MusicDataService.Songs.Commands;
using MusicDataService.Utils;

namespace MusicDataService.CommandHandlers;

public interface ICommandHandler
{
    public Task<Result<int>> Handle(AddSongCommand command);
    public Task<Result<int>> Handle(UpdateSongCommand command);
    public Task<Result<int>> Handle(DeleteSongCommand command);
}
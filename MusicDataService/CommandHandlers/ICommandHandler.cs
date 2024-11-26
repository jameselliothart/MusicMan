using MusicDataService.Songs.Commands;
using MusicDataService.Utils;

namespace MusicDataService.CommandHandlers;

public interface ICommandHandler
{
    Task<Result<int>> Handle(ICommand command);
}
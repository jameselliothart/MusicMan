using MusicDataService.Songs.Commands;

namespace MusicDataService.CommandHandlers;

public interface ICommandHandler
{
    Task<int> Handle(ICommand command);
}
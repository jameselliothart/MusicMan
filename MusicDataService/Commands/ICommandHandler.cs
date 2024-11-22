namespace MusicDataService.Commands;

public interface ICommandHandler
{
    int Handle(ICommand command);
}
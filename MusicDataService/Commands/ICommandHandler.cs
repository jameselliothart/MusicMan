namespace MusicDataService.Commands;

public interface ICommandHandler
{
    Task<int> Handle(ICommand command);
}
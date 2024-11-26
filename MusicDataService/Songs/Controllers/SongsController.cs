using Microsoft.AspNetCore.Mvc;
using MusicDataService.Songs.Commands;
using MusicDataService.Songs.Queries;
using MusicDataService.Songs.Dtos;
using MusicDataService.QueryHandlers;
using MusicDataService.CommandHandlers;
using MusicDataService.Utils;


namespace MusicDataService.Songs.Controllers;

[ApiController]
[Route("api/songs")]
[Produces("application/json")]
public class SongsController(
    ICommandHandler commandHandler,
    IQueryHandler queryHandler,
    ILogger<SongsController> logger
    ) : ControllerBase
{
    public static SongDto ToDto(Song song) => new(song.Id, song.Name, song.Artist, song.Album);

    [HttpGet("/api/guid")]
    [EndpointSummary("Generates a guid for testing and/or heartbeat purposes")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult NewGuid()
    {
        var guid = Guid.NewGuid();
        logger.LogInformation("Returning new guid {guid}", guid);
        return Ok(new { guid });
    }

    [HttpGet]
    [EndpointSummary("Retrieves all songs")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<SongDto[]>> GetAllAsync()
    {
        var query = new QueryAll();
        logger.LogInformation("Received query {query}", query);
        var result = await queryHandler.Handle(query);
        return Ok(result.Select(ToDto).ToList());
    }

    [HttpGet("{id}")]
    [EndpointSummary("Retrieves a single song")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SongDto>> GetSongAsync(Guid id)
    {
        var query = new QuerySpecific(id);
        logger.LogInformation("Received query {query}", query);
        var result = await queryHandler.Handle(query);
        if (!result.Any())
        {
            logger.LogWarning("Unable to find song id '{id}'", id);
            return NotFound();
        }
        return Ok(result.Select(ToDto).First());
    }

    [HttpPost]
    [EndpointSummary("Updates a Song")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddSongAsync([FromBody] AddSongDto song)
    {
        var command = new AddSongCommand(song.Id, song.Name, song.Artist, song.Album);
        logger.LogInformation("Received command {command}", command);
        var addResult = await commandHandler.Handle(command);
        if (addResult.IsSuccess)
        {
            var location = Url.Action("GetSong", "Songs", new { id = command.Id }, Request.Scheme);
            return Created(location, null);
        }
        else
        {
            if (addResult.Error.Code == Error.DUPLICATE)
            {
                logger.LogError("Song with id {id} already exists", command.Id);
                return BadRequest($"Song with id {command.Id} already exists");
            }
            logger.LogError("Bad request for id {id}: {error}", command.Id, addResult.Error.Message);
            return BadRequest($"Bad request for id {command.Id}: {addResult.Error.Message}");
        }
    }

    [HttpPut]
    [EndpointSummary("Updates a Song")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateSongAsync([FromBody] UpdateSongDto song)
    {
        var command = new UpdateSongCommand(song.Id, song.Name, song.Artist, song.Album);
        logger.LogInformation("Received command {command}", command);
        var updateResult = await commandHandler.Handle(command);
        if (updateResult.IsSuccess)
        {
            return NoContent();
        }
        else
        {
            if (updateResult.Error.Code == Error.NOT_FOUND)
            {
                logger.LogError("Failed to find id {id}", command.Id);
                return NotFound();
            }
            logger.LogError("Bad request for id {id}: {error}", command.Id, updateResult.Error.Message);
            return BadRequest($"Bad request for id {command.Id}: {updateResult.Error.Message}");
        }
    }

    [HttpDelete("{id}")]
    [EndpointSummary("Deletes a Song by id")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteSongAsync(Guid id)
    {
        var command = new DeleteSongCommand(id);
        logger.LogInformation("Received command {command}", command);
        var deleteResult = await commandHandler.Handle(command);
        if (deleteResult.IsSuccess)
        {
            return NoContent();
        }
        else
        {
            if (deleteResult.Error.Code == Error.NOT_FOUND)
            {
                logger.LogError("Failed to find id {id}", command.Id);
                return NotFound();
            }
            logger.LogError("Bad request for id {id}: {error}", command.Id, deleteResult.Error.Message);
            return BadRequest($"Bad request for id {command.Id}: {deleteResult.Error.Message}");
        }
    }
}
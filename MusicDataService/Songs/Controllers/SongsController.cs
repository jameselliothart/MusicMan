using Microsoft.AspNetCore.Mvc;
using MusicDataService.Songs.Commands;
using MusicDataService.Songs.Queries;
using MusicDataService.Songs.Dtos;
using MusicDataService.QueryHandlers;
using MusicDataService.CommandHandlers;


namespace MusicDataService.Songs.Controllers;

[ApiController]
[Route("api/songs")]
public class SongsController(
    ICommandHandler commandHandler,
    IQueryHandler queryHandler,
    ILogger<SongsController> logger
    ) : ControllerBase
{
    public static SongDto ToDto(Song song) => new(song.Id, song.Name, song.Artist, song.Album);

    // useful for a heartbeat
    [HttpGet("/api/guid")]
    public IActionResult NewGuid()
    {
        var guid = Guid.NewGuid();
        logger.LogInformation("Returning new guid {guid}", guid);
        return Ok(guid);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var query = new QueryAll();
        logger.LogInformation("Received query {query}", query);
        var result = await queryHandler.Handle(query);
        return Ok(result.Select(ToDto).ToList());
    }

    [HttpGet("{id}")]
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
    public async Task<IActionResult> AddSongAsync([FromBody] AddSongDto song)
    {
        var command = new AddSongCommand(song.Id, song.Name, song.Artist, song.Album);
        logger.LogInformation("Received command {command}", command);
        var addedCount = await commandHandler.Handle(command);
        // TODO use Result
        if (addedCount == 0)
        {
            logger.LogError("Song with id {id} already exists", command.Id);
            return BadRequest($"Song with id {command.Id} already exists");
        }
        var location = Url.Action(nameof(GetSongAsync), "Songs", new { id = command.Id }, Request.Scheme);
        return Created(location, null);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSongAsync([FromBody] UpdateSongDto song)
    {
        var command = new UpdateSongCommand(song.Id, song.Name, song.Artist, song.Album);
        logger.LogInformation("Received command {command}", command);
        var numAffected = await commandHandler.Handle(command);
        if (numAffected == 0)
            return NotFound();
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSongAsync(Guid id)
    {
        var command = new DeleteSongCommand(id);
        logger.LogInformation("Received command {command}", command);
        var numAffected = await commandHandler.Handle(command);
        if (numAffected == 0)
            return NotFound();
        return Ok();
    }
}
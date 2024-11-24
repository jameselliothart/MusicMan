using Microsoft.AspNetCore.Mvc;
using MusicDataService.Commands;
using MusicDataService.Domain;
using MusicDataService.Dtos;
using MusicDataService.Queries;


namespace MusicDataService.Controllers;

[ApiController]
[Route("api/songs")]
public class SongsController(ICommandHandler commandHandler, IQueryHandler queryHandler) : ControllerBase
{
    public static SongDto ToDto(Song song) => new(song.Id, song.Name, song.Artist, song.Album);

    // useful for a heartbeat
    [HttpGet("/api/guid")]
    public IActionResult NewGuid()
    {
        return Ok(Guid.NewGuid());
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var query = new QueryAll();
        var result = await queryHandler.Handle(query);
        return Ok(result.Select(ToDto).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SongDto>> GetSongAsync(Guid id)
    {
        var query = new QuerySpecific(id);
        var result = await queryHandler.Handle(query);
        if (!result.Any())
        {
            return NotFound($"Unable to find song id '{id}'");
        }
        return Ok(result.Select(ToDto).First());
    }

    [HttpPost]
    public async Task<IActionResult> AddSongAsync([FromBody] AddSongDto song)
    {
        var command = new AddSongCommand(song.Id, song.Name, song.Artist, song.Album);
        await commandHandler.Handle(command);
        var location = Url.Action(nameof(GetSongAsync), "Songs", new { id = command.Id }, Request.Scheme);
        return Created(location, null);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSongAsync([FromBody] UpdateSongDto song)
    {
        var command = new UpdateSongCommand(song.Id, song.Name, song.Artist, song.Album);
        var numAffected = await commandHandler.Handle(command);
        if (numAffected == 0)
            return NotFound();
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSongAsync(Guid id)
    {
        var command = new DeleteSongCommand(id);
        var numAffected = await commandHandler.Handle(command);
        if (numAffected == 0)
            return NotFound();
        return Ok();
    }
}
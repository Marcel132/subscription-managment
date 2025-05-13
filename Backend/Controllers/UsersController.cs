using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/production/v01/users")]
public class UsersController : ControllerBase
{
  [HttpGet]
  public async Task<IActionResult> GetAllUser()
  {
    return Ok( new {message = "Działa" });
  }
}


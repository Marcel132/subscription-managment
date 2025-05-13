using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/production/v01/users")]
public class UsersController : ControllerBase
{
  [HttpGet]
  public async Task<IActionResult> GetAllUser()
  {
    await Task.CompletedTask; // Simulate async behavior
    return Ok( new {message = "R działa"});
  }

  [HttpPost]
  public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
  {
    Console.WriteLine(request);
    await Task.CompletedTask; // Simulate async behavior
    return Ok( new {message = "C działa"});
  }
}

public class CreateUserRequest 
{
  public string? Email { get; set;}
  public string? Password { get; set; }
  public bool? RememberMe { get; set; }
  public bool? AcceptRules { get; set; }
}



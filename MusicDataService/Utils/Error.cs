namespace MusicDataService.Utils;

public record Error(string Code, string Message = "")
{
    public const string NOT_FOUND = "record.not.found";
    public const string DUPLICATE = "record.is.duplicate";
    public const string NONE = "none";
    public static Error NotFound() => new(NOT_FOUND);
    public static Error Duplicate() => new(DUPLICATE);
    public static Error None() => new(NONE);
}

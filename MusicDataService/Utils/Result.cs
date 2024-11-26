namespace MusicDataService.Utils;

// @vkhorikov has a much more robust version of Result in https://github.com/vkhorikov/CSharpFunctionalExtensions.
public class Result<T>(T? value, Error error)
{
    private readonly T? _value = value;
    public T? Value => IsSuccess ? _value : throw new Exception($"Cannot access value of Error Result: {Error}");
    public Error Error { get; } = error;
    public bool IsSuccess => Error.Code == Error.NONE;
    public bool IsFailure => !IsSuccess;
}

public sealed class Result : Result<string>
{
    private Result(Error error)
        : base(null, error)
    {
    }

    public static Result<T> Success<T>(T result)
    {
        return new Result<T>(result, Error.None());
    }

    public static Result Success()
    {
        return new Result(Error.None());
    }

    public static Result Failure(Error error)
    {
        return new Result(error);
    }

    public static Result<T> Failure<T>(Error error)
    {
        return new Result<T>(default, error);
    }
}
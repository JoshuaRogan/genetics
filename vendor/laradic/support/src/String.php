<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support;

use Laradic\Support\Stringy\Stringy;

/**
 * String helper functionality.
 * Combines all functionality from:
 * - Illuminate\Support\Str
 * - Underscore\Types\String
 * - Stringy\String.
 *
 * @package     Laradic\Support
 * @author      Robin Radic
 * @license     MIT
 * @copyright   2011-2015, Robin Radic
 * @link        http://radic.mit-license.org
 *
 * @method static mixed accord($count, $many, $one, $zero)
 * @method static mixed randomStrings($words, $length)
 * @method static mixed length($string)
 * @method static mixed isIp($string)
 * @method static mixed isEmail($string)
 * @method static mixed isUrl($string)
 * @method static mixed find($string, $needle, $caseSensitive, $absolute)
 * @method static mixed slice($string, $slice)
 * @method static mixed sliceFrom($string, $slice)
 * @method static mixed sliceTo($string, $slice)
 * @method static mixed baseClass($string)
 * @method static mixed prepend($string, $with)
 * @method static mixed append($string, $with)
 * @method static mixed remove($string, $remove)
 * @method static mixed replace($string, $replace, $with)
 * @method static mixed toggle($string, $first, $second, $loose = false)
 * @method static mixed slugify($string, $separator)
 * @method static mixed explode($string, $with, $limit)
 * @method static mixed lower($string)
 * @method static mixed upper($string)
 * @method static mixed title($string)
 * @method static mixed toPascalCase($string)
 * @method static mixed toSnakeCase($string)
 * @method static mixed toCamelCase($string)
 * @method static mixed ascii($value)
 * @method static mixed camel($value)
 * @method static mixed contains($haystack, $needles)
 * @method static mixed endsWith($haystack, $needles)
 * @method static mixed finish($value, $cap)
 * @method static mixed is($pattern, $value)
 * @method static mixed limit($value, $limit)
 * @method static mixed words($value, $words, $end)
 * @method static mixed parseCallback($callback, $default)
 * @method static mixed plural($value, $count)
 * @method static mixed random($length = 16)
 * @method static mixed quickRandom($length)
 * @method static mixed singular($value)
 * @method static mixed slug($title, $separator = '-')
 * @method static mixed snake($value, $delimiter)
 * @method static mixed startsWith($haystack, $needles)
 * @method static mixed studly($value)
 * @method static mixed macro($name, $macro)
 * @method static mixed hasMacro($name)
 * @method static mixed getEncoding
 * @method static mixed count
 * @method static mixed getIterator
 * @method static mixed offsetExists($offset)
 * @method static mixed offsetGet($offset)
 * @method static mixed offsetSet($offset, $value)
 * @method static mixed offsetUnset($offset)
 * @method static mixed chars
 * @method static mixed upperCaseFirst
 * @method static mixed lowerCaseFirst
 * @method static mixed camelize
 * @method static mixed upperCamelize
 * @method static mixed dasherize
 * @method static mixed underscored
 * @method static mixed applyDelimiter($delimiter)
 * @method static mixed swapCase
 * @method static mixed titleize($ignore)
 * @method static mixed humanize
 * @method static mixed tidy
 * @method static mixed collapseWhitespace
 * @method static mixed toAscii($removeUnsupported)
 * @method static mixed charsArray
 * @method static mixed pad($length, $padStr, $padType)
 * @method static mixed padLeft($length, $padStr)
 * @method static mixed padRight($length, $padStr)
 * @method static mixed padBoth($length, $padStr)
 * @method static mixed applyPadding($left, $right, $padStr)
 * @method static mixed toSpaces($tabLength)
 * @method static mixed toTabs($tabLength)
 * @method static mixed toTitleCase
 * @method static mixed toLowerCase
 * @method static mixed toUpperCase
 * @method static mixed containsAny($needles, $caseSensitive)
 * @method static mixed containsAll($needles, $caseSensitive)
 * @method static mixed surround($substring)
 * @method static mixed insert($substring, $index)
 * @method static mixed truncate($length, $substring)
 * @method static mixed safeTruncate($length, $substring)
 * @method static mixed reverse
 * @method static mixed shuffle
 * @method static mixed trim
 * @method static mixed longestCommonPrefix($otherStr)
 * @method static mixed longestCommonSuffix($otherStr)
 * @method static mixed longestCommonSubstring($otherStr)
 * @method static mixed substr($start, $length)
 * @method static mixed at($index)
 * @method static mixed first($n)
 * @method static mixed last($n)
 * @method static mixed ensureLeft($substring)
 * @method static mixed ensureRight($substring)
 * @method static mixed removeLeft($substring)
 * @method static mixed removeRight($substring)
 * @method static mixed matchesPattern($pattern)
 * @method static mixed hasLowerCase
 * @method static mixed hasUpperCase
 * @method static mixed isAlpha
 * @method static mixed isAlphanumeric
 * @method static mixed isHexadecimal
 * @method static mixed isBlank
 * @method static mixed namespacedStudly()
 * @method static mixed split(string $delimiter, int $limit = null)
 * @method static mixed isJson
 * @method static mixed isLowerCase
 * @method static mixed isUpperCase
 * @method static mixed isSerialized
 * @method static mixed countSubstr($substring, $caseSensitive)
 * @method static mixed regexReplace($pattern, $replacement, $options)
 */
class String
{
    /** @return Stringy */
    public function getStringyString($arguments)
    {
        $str = head($arguments);

        return Stringy::create($str);
    }

    /**
     * Create a new PHP Underscore string instance
     *
     * @param $string
     * @return static
     */
    public static function from($string)
    {
        return \Underscore\Types\String::from($string);
    }

    /**
     * Create a new Stringy string instance
     *
     * @param $string
     * @return \Laradic\Support\Stringy\Stringy
     */
    public static function create($string)
    {
        return Stringy::create($string);
    }


    public function __call($name, $arguments)
    {
        if ( method_exists('Underscore\Methods\StringMethods', $name) )
        {
            return forward_static_call_array([ 'Underscore\Types\String', $name ], $arguments);
        }
        else
        {
            $object = $this->getStringyString($arguments);
            if ( method_exists($object, $name) )
            {
                return call_user_func_array([ $object, $name ], array_slice($arguments, 1));
            }
        }
    }

    public static function __callStatic($name, $arguments)
    {
        return call_user_func_array([ new static(), $name ], $arguments);
    }


}

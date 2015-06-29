<?php
/**
 * Arrays
 */
namespace Laradic\Support;

/**
 * Array helper functionality.
 * Combines all functionality from:
 * - Illuminate\Support\Arr
 * - Underscore\Types\Arrays
 *
 * {@inheritdoc}
 * @package        Laradic\Support
 * @author         Robin Radic
 * @license        MIT
 * @copyright  (c) 2011-2015, Robin Radic
 * @link           http://radic.mit-license.org
 *
 * @method static mixed add($array,$key,$value)
 * @method static mixed build($array,$callback)
 * @method static mixed collapse($array)
 * @method static mixed divide($array)
 * @method static mixed dot($array,$prepend)
 * @method static mixed except($array,$keys)
 * @method static mixed fetch($array,$key)
 * @method static mixed first($array,$callback,$default)
 * @method static mixed last($array,$callback,$default)
 * @method static mixed flatten($array)
 * @method static mixed get($array,$key,$default)
 * @method static mixed has($array,$key)
 * @method static mixed only($array,$keys)
 * @method static mixed pluck($array,$value,$key)
 * @method static mixed sort($array,$callback)
 * @method static mixed where($array,$callback)
 * @method static mixed macro($name,$macro)
 * @method static mixed hasMacro($name)
 * @method static mixed range($_base,$stop,$step)
 * @method static mixed repeat($data,$times)
 * @method static mixed search($array,$value)
 * @method static mixed matches($array,$closure)
 * @method static mixed matchesAny($array,$closure)
 * @method static mixed contains($array,$value)
 * @method static mixed average($array,$decimals)
 * @method static mixed size($array)
 * @method static mixed max($array,$closure)
 * @method static mixed min($array,$closure)
 * @method static mixed find($array,$closure)
 * @method static mixed clean($array)
 * @method static mixed random($array,$take)
 * @method static mixed without
 * @method static mixed intersection($a,$b)
 * @method static mixed intersects($a,$b)
 * @method static mixed initial($array,$to)
 * @method static mixed rest($array,$from)
 * @method static mixed at($array,$closure)
 * @method static mixed replaceValue($array,$replace,$with)
 * @method static mixed replaceKeys($array,$keys)
 * @method static mixed each($array,$closure)
 * @method static mixed shuffle($array)
 * @method static mixed sortKeys($array,$direction)
 * @method static mixed implode($array,$with)
 * @method static mixed filter($array,$closure)
 * @method static mixed invoke($array,$callable,$arguments)
 * @method static mixed reject($array,$closure)
 * @method static mixed removeFirst($array)
 * @method static mixed removeLast($array)
 * @method static mixed removeValue($array,$value)
 * @method static mixed prepend($array,$value)
 * @method static mixed append($array,$value)
 * @method static mixed setAndGet($collection,$key,$default)
 * @method static mixed remove($collection,$key)
 * @method static mixed filterBy($collection,$property,$value,$comparisonOp)
 * @method static mixed findBy($collection,$property,$value,$comparisonOp)
 * @method static mixed keys($collection)
 * @method static mixed values($collection)
 * @method static mixed replace($collection,$replace,$key,$value)
 * @method static mixed group($collection,$grouper)
 * @method static mixed internalSet($collection,$key,$value)
 * @method static mixed internalRemove($collection,$key)
 */
class Arrays
{

    public function __call($name, $arguments)
    {
        if ( method_exists('Illuminate\Support\Arr', $name) )
        {
            return forward_static_call_array([ 'Illuminate\Support\Arr', $name ], $arguments);
        }
        elseif ( method_exists('Underscore\Methods\ArraysMethods', $name) )
        {
            return forward_static_call_array([ 'Underscore\Types\Arrays', $name ], $arguments);
        }
    }

    public static function __callStatic($name, $arguments)
    {
        return call_user_func_array([ new static(), $name ], $arguments);
    }

    /**
     * unflatten
     *
     * @param array  $array
     * @param string $delimiter
     * @return array
     */
    public static function unflatten(array $array, $delimiter = '.')
    {
        $unflattenedArray = array();
        foreach ( $array as $key => $value )
        {
            $keyList  = explode($delimiter, $key);
            $firstKey = array_shift($keyList);
            if ( sizeof($keyList) > 0 )
            { //does it go deeper, or was that the last key?
                $subarray = static::unflatten(array( implode($delimiter, $keyList) => $value ), $delimiter);
                foreach ( $subarray as $subarrayKey => $subarrayValue )
                {
                    $unflattenedArray[ $firstKey ][ $subarrayKey ] = $subarrayValue;
                }
            }
            else
            {
                $unflattenedArray[ $firstKey ] = $value;
            }
        }

        return $unflattenedArray;
    }

    /**
     * Get a value from the array, and remove it.
     *
     * @param  array  $array
     * @param  string $key
     * @param  mixed  $default
     * @return mixed
     */
    public static function pull(&$array, $key, $default = null)
    {
        $value = static::get($array, $key, $default);

        static::forget($array, $key);

        return $value;
    }

    /**
     * Set an array item to a given value using "dot" notation.
     *
     * If no key is given to the method, the entire array will be replaced.
     *
     * @param  array  $array
     * @param  string $key
     * @param  mixed  $value
     * @return array
     */
    public static function set(&$array, $key, $value)
    {
        if ( is_null($key) )
        {
            return $array = $value;
        }

        $keys = explode('.', $key);

        while ( count($keys) > 1 )
        {
            $key = array_shift($keys);

            // If the key doesn't exist at this depth, we will just create an empty array
            // to hold the next value, allowing us to create the arrays to hold final
            // values at the correct depth. Then we'll keep digging into the array.
            if ( ! isset($array[ $key ]) || ! is_array($array[ $key ]) )
            {
                $array[ $key ] = [ ];
            }

            $array =& $array[ $key ];
        }

        $array[ array_shift($keys) ] = $value;

        return $array;
    }

    /**
     * Remove one or many array items from a given array using "dot" notation.
     *
     * @param  array        $array
     * @param  array|string $keys
     * @return void
     */
    public static function forget(&$array, $keys)
    {
        $original =& $array;

        foreach ( (array)$keys as $key )
        {
            $parts = explode('.', $key);

            while ( count($parts) > 1 )
            {
                $part = array_shift($parts);

                if ( isset($array[ $part ]) && is_array($array[ $part ]) )
                {
                    $array =& $array[ $part ];
                }
            }

            unset($array[ array_shift($parts) ]);

            // clean up after each pass
            $array =& $original;
        }
    }
}

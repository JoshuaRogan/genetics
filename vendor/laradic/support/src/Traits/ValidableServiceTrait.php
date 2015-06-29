<?php
/**
 * Part of the Laradic packages.
 * MIT License and copyright information bundled with this package in the LICENSE file.
 *
 * @author      Robin Radic
 * @license     MIT
 * @copyright   2011-2015, Robin Radic
 * @link        http://radic.mit-license.org
 */
namespace Laradic\Support\Traits;

use Exception;
use Laradic\Support\Contracts\Validable;

/**
 * Trait ValidableServiceTrait
 *
 * @package     Laradic\Support\Traits
 * @property \Illuminate\Support\MessageBag $errors
 */
trait ValidableServiceTrait
{
    /** @var \Laradic\Support\Contracts\Validable[] */
    protected $validators;

    /**
     * Get the value of validators
     *
     * @return mixed
     */
    public function getValidators()
    {
        return $this->validators;
    }

    /**
     * Sets the value of validators
     *
     * @param mixed $validators
     * @return mixed
     */
    public function setValidators($validators)
    {
        $this->validators = $validators;

        return $this;
    }


    /**
     * Run the validation checks on the input data
     *
     * @param array $data
     * @return bool
     * @throws \Exception
     */
    public function runValidationChecks(array $data)
    {
        foreach ($this->validators as $validator)
        {
            if ( $validator instanceof Validable )
            {
                if ( ! $validator->with($data)->passes() )
                {
                    $this->errors = $validator->errors();
                }
            }

            else
            {
                throw new Exception("{$validator} is not an instance of Laradic\\Support\\Contracts\\Validable");
            }
        }

        if ( $this->errors->isEmpty() )
        {
            return true;
        }
    }
}

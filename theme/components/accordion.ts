import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys)


const solid = definePartsStyle({
  panel: {
    border: '1px solid',
    borderColor: 'gray.400',
    background: 'gray.100',
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
    },
  },
	button: {
		color: 'black',
		border: '1px solid',
		borderColor: 'gray.400',
		bg: 'blackAlpha.200',
		_hover: {
			bg: "blackAlpha.400",
		},
		_dark: {
			color: 'gray.200',
      borderColor: 'gray.600',
      background: 'gray.800',
			_hover: {
				bg: "gray.900",
			},
    },
	},
  icon: {
    _dark: {
      color: 'gray.200',
    },
  },
})

const light = definePartsStyle({});

const accordionTheme = defineMultiStyleConfig({
  variants: { solid, light },
	defaultProps: {
    variant: 'solid',
  },
})

export default accordionTheme;
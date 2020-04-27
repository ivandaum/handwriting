import { post } from './Ajax'

const url = 'https://www.google.com/inputtools/request?ime=handwriting'

export const normalizePosition = coords => {
    const trace = []
    let letter = [[], []]

    coords.map(coord => {
        const [x, y] = coord

        if (x === null || y === null) {
            trace.push([letter[0], letter[1], []])
            letter = [[], []]
        } else {
            letter[0].push(x)
            letter[1].push(y)
        }
    })

    return trace
}

export const recognize = async ({ coords, width, height }) => {
    const params = JSON.stringify({
        options: 'enable_pre_space',
        requests: [
            {
                writing_guide: {
                    writing_area_width: width,
                    writing_area_height: height,
                },
                ink: normalizePosition(coords),
                language: 'en',
            },
        ],
    })

    try {
        return await post({ url, params })
    } catch (error) {
        return { error }
    }
}

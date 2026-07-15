from requests import get
import sys

inp = sys.argv[1]


def main():
    res = get(
        inp,
        headers={
            'User-Agent': (
                'Mozilla/5.0 (Windows NT 10.0; Win64) '
                'AppleWebkit/537.36'
            )
        },
        timeout=30
    )

    response = res.text
    print(response)


main()

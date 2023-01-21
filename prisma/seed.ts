import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'Jonh Doe',
			email: 'jonh@email.com',
			avatarUrl: 'https://cdn-icons-png.flaticon.com/512/1785/1785888.png'
		}
	})

	const pool = await prisma.pool.create({
		data: {
			title: 'Example pool',
			code: 'BOL123',
			ownerId: user.id,

			participants: {
				create: {
					userId: user.id
				}
			}
		}
	})

	await prisma.game.create({
		data: {
			date: '2023-01-21T20:49:03.839Z',
			firstTeamCountryCode: 'DE',
			secondTeamCountryCode: 'BR'
		}
	})

	await prisma.game.create({
		data: {
			date: '2023-01-20T20:49:03.839Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'AR',

			guesses: {
				create: {
					firstTeamPoints: 2,
					secondTeamPoints: 2,
					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id
							}
						}
					}
				}
			}
		}
	})
}

main();

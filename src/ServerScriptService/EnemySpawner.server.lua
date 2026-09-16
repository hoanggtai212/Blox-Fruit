local Workspace = game:GetService("Workspace")

local enemyFolder = Instance.new("Folder")
enemyFolder.Name = "Enemies"
enemyFolder.Parent = Workspace

local function createEnemy(position)
	local model = Instance.new("Model")
	model.Name = "Bandit"
	model.Parent = enemyFolder

	-- Thân quái
	local body = Instance.new("Part")
	body.Name = "HumanoidRootPart"
	body.Size = Vector3.new(2, 3, 1)
	body.Position = position
	body.Anchored = true
	body.Parent = model

	-- Humanoid
	local humanoid = Instance.new("Humanoid")
	humanoid.MaxHealth = 100
	humanoid.Health = 100
	humanoid.Parent = model

	model.PrimaryPart = body

	-- Khi quái chết
	humanoid.Died:Connect(function()
		print("Bandit đã bị hạ!")

		-- Cho người chơi EXP sau này
		task.wait(3)

		if model then
			model:Destroy()
		end
	end)
end

-- Tạo 5 quái
for i = 1, 5 do
	local position = Vector3.new(i * 6, 3, 0)
	createEnemy(position)
end

print("Đã tạo 5 Bandit!")

﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using OrionApi.Data;
using OrionApi.Data.Models;
using OrionApi.Models.Communities;

namespace OrionApi.Services.Communities
{
    public class CommunityService : ICommunityService
    {
        private readonly OrionDbContext data;

        public CommunityService(OrionDbContext data)
        {
            this.data = data;
        }

        public async Task<string> Create(string title, string description, string userId)
        {
            var exists = data.Communities.Any(c => c.Name == title);
            if (exists)
            {
                throw new InvalidOperationException("Community already exists.");
            }

            var community = new Community
            {
                Name = title,
                Description = description,
                CreatedOn = DateTime.UtcNow,
                CreatorId = userId,
            };
            var user = data.Users.Find(userId);
            community.Members.Add(user);

            await data.Communities.AddAsync(community);
            await data.SaveChangesAsync();

            return community.Id;
        }

        public ICollection<TopCommunityModel> GetTop()
              => data.Communities
                .OrderBy(c => c.Members.Count)
                .ThenBy(c => c.Name)
                .Take(5)
                .Select(x => new TopCommunityModel
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToList();

        public CommunityModel Get(string name)
            => data.Communities
                .Where(c => c.Name == name)
                .Select(x => new CommunityModel
                {
                    Name = x.Name,
                    CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
                    Description = x.Description,
                    Members = x.Members.Count
                })
            .FirstOrDefault();
    }
}
